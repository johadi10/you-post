import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import {
  GroupActionTypes,
  GetGroupMessagesSuccess,
  GetGroupMessages,
  CreateMessage,
  CreateMessageSuccess,
  GetGroupUsersSuccess,
  GetGroupUsers,
  GetUsersBySearch,
  GetUsersBySearchSuccess,
  AddUserToGroup,
  AddUserToGroupSuccess,
  GroupError, CreateGroup, CreateGroupSuccess, GetUserGroups, GetUserGroupsSuccess
} from '../actions';
import { GroupService } from '../../../services/group.service';

@Injectable()
export class GroupEffect {
  @Effect()
  getGroupMesages$: Observable<Action> = this.actions$.ofType<GetGroupMessages>(GroupActionTypes.GET_MESSAGES)
    .pipe(
      mergeMap((action) => this.groupService.getGroupMessages(action.payload)
        .pipe(
          map((data) => {
            return new GetGroupMessagesSuccess(data);
          }),
          catchError((err) => {
            err.type = GroupActionTypes.GET_MESSAGES;
            return of(new GroupError(err));
          })
        )
      )
    );

  @Effect()
  createMessage$: Observable<Action> = this.actions$.ofType<CreateMessage>(GroupActionTypes.CREATE_MESSAGE)
    .pipe(
      mergeMap((action) => this.groupService.createMessage(
        action.payload.messageDetail, action.payload.groupId
        )
        .pipe(
          map((data) => {
            return new CreateMessageSuccess(data);
          }),
          catchError((err) => {
            err.type = GroupActionTypes.CREATE_MESSAGE;
            return of(new GroupError(err));
          })
        )
      )
    );

  @Effect()
  getGroupUsers$: Observable<Action> = this.actions$.ofType<GetGroupUsers>(GroupActionTypes.GET_GROUP_USERS)
    .pipe(
      mergeMap((action) => this.groupService.getGroupUsers(action.payload)
        .pipe(
          map((data) => {
            return new GetGroupUsersSuccess(data);
          }),
          catchError((err) => {
            err.type = GroupActionTypes.GET_GROUP_USERS;
            return of(new GroupError(err));
          })
        )
      )
    );

  @Effect()
  getUsersBySearch$: Observable<Action> = this.actions$.ofType<GetUsersBySearch>(GroupActionTypes.GET_USERS_BY_SEARCH)
    .pipe(
      switchMap((action) => this.groupService.getUsersBySearch(
        action.payload.searchTerm, action.payload.groupId
        )
          .pipe(
            map((data) => {
              return new GetUsersBySearchSuccess(data);
            }),
            catchError((err) => {
              err.type = GroupActionTypes.GET_USERS_BY_SEARCH;
              return of(new GroupError(err));
            })
          )
      )
    );

  @Effect()
  addUserToGroup$: Observable<Action> = this.actions$.ofType<AddUserToGroup>(GroupActionTypes.ADD_USER_TO_GROUP)
    .pipe(
      mergeMap((action) => this.groupService.addUserToGroup(
        action.payload.userDetails, action.payload.groupId
        )
          .pipe(
            map((data) => {
              return new AddUserToGroupSuccess(data);
            }),
            catchError((err) => {
              err.type = GroupActionTypes.ADD_USER_TO_GROUP;
              return of(new GroupError(err));
            })
          )
      )
    );

  @Effect()
  createGroup$: Observable<Action> = this.actions$.ofType<CreateGroup>(GroupActionTypes.CREATE_GROUP)
    .pipe(
      mergeMap((action) =>
        this.groupService.createGroup(action.payload)
          .pipe(
            map((data) => {
              return new CreateGroupSuccess(data);
            }),
            catchError((err) => {
              err.type = GroupActionTypes.CREATE_GROUP;
              return of(new GroupError(err));
            })
          )
      )
    );

  @Effect()
  getUserGroups$: Observable<Action> = this.actions$.ofType<GetUserGroups>(GroupActionTypes.GET_USER_GROUPS)
    .pipe(
      mergeMap(() =>
        this.groupService.getUserGroups()
          .pipe(
            map((data) => {
              return new GetUserGroupsSuccess(data);
            }),
            catchError((err) => {
              err.type = GroupActionTypes.GET_USER_GROUPS;
              return of(new GroupError(err));
            })
          )
      )
    );

  constructor(private actions$: Actions, private groupService: GroupService) {}

}