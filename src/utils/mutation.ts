import { gql } from '@apollo/client';

export const REGISTER_NEW_USER = gql`
    mutation Mutation($email: String!, $password: String!, $specialOffers: Boolean!, $subscriptionPlan: String!) {
        registerUser(email: $email, password: $password, specialOffers: $specialOffers, subscriptionPlan: $subscriptionPlan) {
            token
        }
    }
`;

export const ADD_NEW_PROFILE = gql`
    mutation Mutation($profileList: ProfileInput!) {
        updateUserProfileList(profileList: $profileList) {
            autoplay_next_episode
            autoplay_preview
            kid
            language
            p_name
            profile_pic
            my_list {
                id
                title
                name
                media_type
                poster_path
                backdrop_path
                overview
                genre_ids
                vote_average
                runtime
                number_of_seasons
                number_of_episodes
                }
            }
        }
`;

export const REMOVE_PROFILE = gql`
    mutation Mutation($pName: String!) {
        removeProfile(p_name: $pName) {
            msg
            type
        }
    }
`;

export const UPDATE_PROFILE = gql`
    mutation Mutation($pName: String!, $profile: ProfileInput!) {
        updateProfile(p_name: $pName, profile: $profile) {
            p_name
            kid
            language
            profile_pic
            autoplay_next_episode
            autoplay_preview
            my_list {
                id
                genre_ids
                backdrop_path
                media_type
                name
                number_of_episodes
                number_of_seasons
                overview
                poster_path
                runtime
                title
                vote_average
            }
        }
    }
`;