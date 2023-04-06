import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { useHistory } from 'react-router';
import useToast from '../customHooks/useToast';
import { GET_PROFILE } from '../graphql/queries';
import useCustomQuery from '../network/useCustomQuery';

const CONTEXT_ERROR = 'Global context not found. Have you wrapped your components with GlobalContext.Consumer?';

const GlobalStateContext = createContext(undefined);
const GlobalDispatchContext = createContext({
  setStep: () => {
    throw new Error(CONTEXT_ERROR);
  },
  setToken: () => {
    throw new Error(CONTEXT_ERROR);
  },
  setUser: () => {
    throw new Error(CONTEXT_ERROR);
  },
  clearUser: () => {
    throw new Error(CONTEXT_ERROR);
  },
  clearStep: () => {
    throw new Error(CONTEXT_ERROR);
  },
  setPos: () => {
    throw new Error(CONTEXT_ERROR);
  },
  get_profile: () => {
    throw new Error(CONTEXT_ERROR);
  },
  get_profile_in_app: () => {
    throw new Error(CONTEXT_ERROR);
  },
  setEmailVerifiedTrue: () => {
    throw new Error(CONTEXT_ERROR);
  },
  setShowResetPasswordModal: () => {
    throw new Error(CONTEXT_ERROR);
  },
});

function reducer(prevState, action) {
  switch (action.type) {
  case 'LOAD_PROFILE':
    return { ...prevState, profile: action.data };
  case 'SET_STEP':
    return {
      ...prevState,
      step: prevState.step >= action.data ? prevState.step : action.data,
    };
  case 'RESET_STEP':
    return { ...prevState, step: 0 };
  case 'RESET_POS':
    return { ...prevState, pos: 0 };
  case 'SET_TOKEN':
    return { ...prevState, token: action.data };
  case 'SET_POS':
    return { ...prevState, pos: action.data };
  case 'SET_EMAIL_VERIFIED_TRUE':
    return {
      ...prevState,
      profile: { ...prevState?.profile, isEmailVerified: true },
    };
  case 'SET_RESET_PASSWORD_MODAL':
    return {
      ...prevState,
      showResetPasswordModal: action.data,
    };
  default:
    return prevState;
  }
}

const GlobalProvider = ({ children }) => {
  const defaults = {
    profile: {},
    step: 1,
    pos: 0,
  };
  const Toast = useToast();
  const [state, dispatch] = useReducer(reducer, {
    ...defaults,
    pos: defaults?.step,
  });
  const { push } = useHistory();
  const [getProfileQuery, profileLoading, profileData] = useCustomQuery({
    query: GET_PROFILE,
    onError: (err) => {
      Toast.error('Failed to get profile details');
      if (err) push('/');
    },
    onData: () => {},
  });

  const [getProfileInAppQuery, , profileInAppData] = useCustomQuery({
    query: GET_PROFILE,
    onError: () => {},
    onData: () => {},
  });

  const get_profile = async () => {
    try {
      await getProfileQuery();
    } catch (e) {
      Toast.error('Failed to get profile details');
      if (e && e.graphQLErrors && e.graphQLErrors.length > 0) {
        console.log(e.graphQLErrors[0].message);
      } else {
        console.log('Something went wrong');
      }
    }
  };

  const get_profile_in_app = async () => {
    try {
      await getProfileInAppQuery();
    } catch (e) {
      Toast.error('Failed to get profile details');
      if (e && e.graphQLErrors && e.graphQLErrors.length > 0) {
        console.log(e.graphQLErrors[0].message);
      } else {
        console.log('Something went wrong');
      }
    }
  };

  const setEmailVerifiedTrue = () => {
    dispatch({ type: 'SET_EMAIL_VERIFIED_TRUE', data: {} });
  };

  useEffect(() => {
    if (profileData) {
      if (profileData?.getMerchantUserDetail?.data) {
        const user = profileData?.getMerchantUserDetail?.data;
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: 'LOAD_PROFILE', data: user });

        const onboardingStage = Number(user?.merchant?.onboardingStage);

        if (!Number.isNaN(onboardingStage)) {
          const currStep = onboardingStage > 5 ? 5 : onboardingStage || 1; // check implementation
          dispatch({ type: 'SET_STEP', data: currStep });
          dispatch({ type: 'SET_POS', data: currStep });
        }
      } else {
        Toast.error('Failed to get profile details');
        push('/');
      }
    }
  }, [profileData]);

  useEffect(() => {
    if (profileInAppData) {
      if (profileInAppData?.getMerchantUserDetail?.data) {
        const user = profileInAppData?.getMerchantUserDetail?.data;
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: 'LOAD_PROFILE', data: user });
      }
    }
  }, [profileInAppData]);

  // actions
  const GlobalDispatch = useMemo(
    () => ({
      setStep: async (step) => {
        dispatch({ type: 'SET_STEP', data: step });
        dispatch({ type: 'SET_POS', data: step });
      },
      setPos: async (pos) => {
        dispatch({ type: 'SET_POS', data: pos });
      },
      setToken: async (token) => {
        localStorage.setItem('token', token);
        dispatch({ type: 'SET_TOKEN', data: token });
      },
      setUser: async (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: 'LOAD_PROFILE', data: user });
      },
      clearStep: async () => {
        dispatch({ type: 'RESET_STEP' });
        dispatch({ type: 'RESET_POS' });
      },
      clearUser: async () => {
        localStorage.clear();
        dispatch({ type: 'LOAD_PROFILE', data: {} });
        dispatch({ type: 'SET_TOKEN', data: '' });
      },
      get_profile: async () => get_profile(),
      get_profile_in_app: async () => get_profile_in_app(),
      setEmailVerifiedTrue: async () => setEmailVerifiedTrue(),
      setShowResetPasswordModal: async (showResetPasswordModal) => {
        dispatch({ type: 'SET_RESET_PASSWORD_MODAL', data: showResetPasswordModal });
      },
    }),
    [],
  );

  return (
    <GlobalDispatchContext.Provider value={GlobalDispatch}>
      <GlobalStateContext.Provider
        value={{ ...state, profileLoading, profileData }}
      >
        {children}
      </GlobalStateContext.Provider>
    </GlobalDispatchContext.Provider>
  );
};

function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used with a GlobalProvider');
  }
  return context;
}

function useGlobalDispatch() {
  const context = useContext(GlobalDispatchContext);
  if (context === undefined) {
    throw new Error('useGlobalDispatch must be used with a GlobalProvider');
  }
  return context;
}

export { useGlobalDispatch, useGlobalState, GlobalProvider };
