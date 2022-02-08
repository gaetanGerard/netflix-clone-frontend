import { gql } from '@apollo/client';

export const REGISTER_NEW_USER = gql`
    mutation Mutation($email: String!, $password: String!, $specialOffers: Boolean!, $subscriptionPlan: String!) {
        registerUser(email: $email, password: $password, specialOffers: $specialOffers, subscriptionPlan: $subscriptionPlan) {
            token
        }
    }
`;

export const ADD_NEW_PROFILE = gql`
    mutation Mutation($userDetail: UserInput!) {
        updateUser(userDetail: $userDetail) {
            _id
            email
            date_of_birth
            description
            firstname
            gender
            lastname
            profile_pic
            updated_at
            created_at
            rememberMe
            specialOffers
            subscriptionPlan
            profiles {
                p_name
                kid
                language
                profile_pic
                autoplay_next_episode
                autoplay_preview
            }
        }
    }
`;