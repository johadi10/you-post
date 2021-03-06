export interface ErrorI {
  message: any;
  status: any;
  type: string;
}

export interface GroupStateI {
  groupMessages: any;
  createMessageSuccess: any;
  groupUsers: any;
  addUserToGroupSuccess: any;
  searchedUserDetails: any;
  createGroupSuccess: any;
  userGroups: any;
  dashboardMessages: any;
  isLoading: boolean;
  currentViewingMessage: any;
  error: ErrorI;
}

export interface UserStateI {
  isLoading: boolean;
  userIsUpdated: boolean;
  error: any;
}

export interface AuthStateI {
  isLoading: boolean;
  isAuthenticating: boolean;
  signupSuccess: boolean;
  signinSuccess: boolean;
  userDetails: any;
  error: any;
}
export interface GroupFeatureStateI {
  groupState: GroupStateI;
  authState: AuthStateI;
  userState: UserStateI;
}

export interface AppStateI {
  group: GroupFeatureStateI;
}
