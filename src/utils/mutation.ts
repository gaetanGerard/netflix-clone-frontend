import { gql } from '@apollo/client';

export const REGISTER_NEW_USER = gql`
    mutation Mutation($email: String!, $password: String!, $specialOffers: Boolean!, $subscriptionPlan: String!) {
        registerUser(email: $email, password: $password, specialOffers: $specialOffers, subscriptionPlan: $subscriptionPlan) {
            token
        }
    }
`;