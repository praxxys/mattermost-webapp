// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {shallow} from 'enzyme';

import {UserProfile} from 'mattermost-redux/types/users';
import {TeamMembership} from 'mattermost-redux/types/teams';

import UserGrid from './user_grid';

describe('components/admin_console/user_grid/UserGrid', () => {
    function createUser (id: string, username: string, bot: boolean): UserProfile {
        return {
            id,
            create_at: 1589222794545,
            update_at: 1589222794545,
            delete_at: 0,
            username,
            auth_data: '',
            auth_service: '',
            email: '',
            email_verified: true,
            nickname: username,
            first_name: '',
            last_name: '',
            position: '',
            roles: 'system_user',
            locale: '',
            notify_props: null,
            terms_of_service_id: '',
            terms_of_service_create_at: 0,
            is_bot: bot,
            last_picture_update: 0,
        }
    }

    function createMembership (userId: string, admin: boolean): TeamMembership {
        return {
            mention_count: 0,
            msg_count: 0,
            team_id: 'team',
            user_id: userId,
            roles: admin ? 'team_user team_admin' : 'team_user',
            delete_at: 0,
            scheme_user: true,
            scheme_admin: admin,
        }
    };
    const user1 = createUser('userid1', 'user-1', false);
    const membership1 =  createMembership('userId1', false);

    const user2 = createUser('userid2', 'user-2', false);
    const membership2 =  createMembership('userId2', false);

    const notSavedUser = createUser('userid-not-saved', 'user-not-saved', false);

    const baseProps = {
        users: [user1, user2],
        memberships: {[user1.id]: membership1, [user2.id]: membership2},

        excludeUsers: {},
        includeUsers: {},

        loadPage: jest.fn(),
        search: jest.fn(),
        removeUser: jest.fn(),
        updateMemberRolesForUser: jest.fn(),

        totalCount: 2,
        loading: false,
    }

    test('should match snapshot with 2 users', () => {
        const wrapper = shallow(
            <UserGrid
                {...baseProps}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });

    test('should match snapshot with 2 users and 1 added included', () => {
        const wrapper = shallow(
            <UserGrid
                {...baseProps}
                includeUsers={{[notSavedUser.id]: notSavedUser}}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });

    test('should match snapshot with 2 users and 1 removed user', () => {
        const wrapper = shallow(
            <UserGrid
                {...baseProps}
                excludeUsers={{[user1.id]: user1}}
            />
        );
        expect(wrapper).toMatchSnapshot();
    });
});
