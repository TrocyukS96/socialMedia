export const topics:ITopic[] = [
    {
        value: 'WEB_DEVELOPMENT',
        label: 'Web',
    },
    {
        value: 'DATA_SCIENCE',
        label: 'Data Science',
    },
    {
        value: 'ANDROID_DEVELOPMENT',
        label: 'Android',
    },
    {
        value: 'IOS_DEVELOPMENT',
        label: 'IOS',
    },
    {
        value: 'QUALITY_ASSISTANCE',
        label: 'QA',
    },
    {
        value: 'DESIGN',
        label: 'UX/UI',
    }
]

export interface ITopic {
    value: string,
    label: string
}