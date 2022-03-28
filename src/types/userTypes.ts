export interface Profile {
    autoplay_next_episode: boolean
    autoplay_preview: boolean
    kid: boolean
    language: string
    p_name: string
    profile_pic: number
    __typename: string
}

export interface User {
    created_at: string
    date_of_birth: string
    description: string
    email: string
    firstname: string
    gender: number
    lastname: string
    profiles: [Profile]
    rememberMe: boolean
    specialOffers: boolean
    subscriptionPlan: string
    updated_at: string
    __typename: string
    _id: string
}