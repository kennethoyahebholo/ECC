import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { useHistory, useLocation } from 'react-router';
import useToast from '../customHooks/useToast';
import {
  GET_CATEGORIES, GET_GROUP_USERS, GET_PAYFI_PRODUCT, GET_PROFILE,
} from '../graphql/admin_queries';
import useCustomQuery from '../network/useCustomQuery';

const CONTEXT_ERROR = 'Global context not found. Have you wrapped your components with GlobalContext.Consumer?';

const GlobalStateContext = createContext(undefined);
const GlobalDispatchContext = createContext({
  setToken: () => {
    throw new Error(CONTEXT_ERROR);
  },
  setUser: () => {
    throw new Error(CONTEXT_ERROR);
  },
  clearUser: () => {
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
  setUserPermissions: () => {
    throw new Error(CONTEXT_ERROR);
  },
});

function reducer(prevState, action) {
  switch (action.type) {
  case 'LOAD_PROFILE':
    return {
      ...prevState,
      profile: { ...action.data, isEmailVerified: true },
    };
  case 'SET_TOKEN':
    return { ...prevState, token: action.data };
  case 'SET_EMAIL_VERIFIED_TRUE':
    return {
      ...prevState,
      profile: { ...prevState?.profile, isEmailVerified: true },
    };
  case 'LOAD_PAYFI_PRODUCT':
    return { ...prevState, payfiProducts: action.data };
  case 'LOAD_CATEGORY':
    return { ...prevState, categories: action.data };
  case 'LOAD_GROUP_USERS':
    return { ...prevState, groupUsers: action.data };
  case 'SET_USER_PERMISSIONS':
    return { ...prevState, userPermissions: action.data };
  default:
    return prevState;
  }
}

const AdminGlobalProvider = ({
  children,
}) => {
  const defaults = {
    profile: {},
    token: '',
  };
  const Toast = useToast();
  const [state, dispatch] = useReducer(reducer, {
    ...defaults,
  });
  const { push } = useHistory();
  const [shrinkBar, setShrinkBar] = useState(true);
  const [getProfileQuery, profileLoading, profileData] = useCustomQuery({
    query: GET_PROFILE,
    onError: (err) => {
      Toast.error('Failed to get profile details');
      if (err) push('/');
    },
    onData: () => {},
  });
  const { pathname } = useLocation();

  const isAuthRoutes = ![
    '/',
    '/forgot-password',
    '/password-reset',
  ].includes(pathname);
  const [getCategories,, categories] = useCustomQuery({
    query: GET_CATEGORIES,
    onError: () => {},
    onData: () => {},
  });

  const [getGroupUsers, , groupUsers] = useCustomQuery({
    query: GET_GROUP_USERS,
    onError: () => {},
    onData: () => {},
  });

  const [getPayfiProduct,, payfiProduct] = useCustomQuery({
    query: GET_PAYFI_PRODUCT,
    onError: () => {},
    onData: () => {},
  });

  useEffect(() => {
    if (isAuthRoutes) getCategories();
  }, []);
  useEffect(() => {
    if (isAuthRoutes) getGroupUsers();
  }, []);

  useEffect(() => {
    if (state.profile && isAuthRoutes) {
      getPayfiProduct();
    }
  }, [state?.profile]);

  useEffect(() => {
    if (categories?.getWebsiteCategories?.length) {
      const categoryArr = categories?.getWebsiteCategories?.map((list) => ({
        value: list?.id,
        label: list?.name,
      }));
      dispatch({ type: 'LOAD_CATEGORY', data: categoryArr });
    }
  }, [categories]);

  useEffect(() => {
    if (groupUsers?.getUserGroups?.length) {
      const groupUserArr = groupUsers?.getUserGroups?.map((list) => ({
        value: list?.id,
        label: list?.name,
      }));
      dispatch({ type: 'LOAD_GROUP_USERS', data: groupUserArr });
    }
  }, [groupUsers]);

  useEffect(() => {
    if (payfiProduct?.getPayfiProducts?.payfiProducts?.length) {
      const payfiProductArr = payfiProduct?.getPayfiProducts?.payfiProducts?.map((list) => ({
        value: list?.id,
        label: list?.name,
      }));
      dispatch({ type: 'LOAD_PAYFI_PRODUCT', data: payfiProductArr });
    }
  }, [payfiProduct]);

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
      if (profileData?.getAdminUser?.id) {
        const user = profileData?.getAdminUser;
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: 'LOAD_PROFILE', data: user });
        const getPermissionList = user?.role?.permissions?.map((list) => list?.name);

        dispatch({ type: 'SET_USER_PERMISSIONS', data: getPermissionList });
      } else {
        Toast.error('Failed to get profile details');
        push('/');
      }
    }
  }, [profileData]);

  useEffect(() => {
    if (profileInAppData) {
      if (profileInAppData?.getAdminUser?.id) {
        const user = profileInAppData?.getAdminUser;
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: 'LOAD_PROFILE', data: user });
      }
    }
  }, [profileInAppData]);
  // actions
  const GlobalDispatch = useMemo(
    () => ({
      setToken: async (token) => {
        localStorage.setItem('token', token);
        dispatch({ type: 'SET_TOKEN', data: token });
      },
      setUser: async (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: 'LOAD_PROFILE', data: user });
      },
      clearUser: async () => {
        localStorage.clear();
        dispatch({ type: 'LOAD_PROFILE', data: {} });
        dispatch({ type: 'SET_TOKEN', data: '' });
      },
      get_profile: async () => get_profile(),
      get_profile_in_app: async () => get_profile_in_app(),
      setEmailVerifiedTrue: async () => setEmailVerifiedTrue(),
      setUserPermissions: async (permissions) => {
        dispatch({ type: 'SET_USER_PERMISSIONS', data: permissions });
      },
    }),
    [],
  );

  return (
    <GlobalDispatchContext.Provider value={GlobalDispatch}>
      <GlobalStateContext.Provider
        value={{
          ...state, profileLoading, profileData, shrinkBar, setShrinkBar,
        }}
      >
        {children}
      </GlobalStateContext.Provider>
    </GlobalDispatchContext.Provider>
  );
};

function useGlobalState(){
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used with a AdminGlobalProvider');
  }
  return context;
}

function useGlobalDispatch(){
  const context = useContext(GlobalDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useGlobalDispatch must be used with a AdminGlobalProvider',
    );
  }
  return context;
}

export { useGlobalDispatch, useGlobalState, AdminGlobalProvider };
