export const findLabelByValue = (values:string[])=>{
    const labels =[] as string[]

    if(values){


        values.forEach(topic=>{
            switch (topic) {
                case 'WEB_DEVELOPMENT':{
                    labels.push('Web')
                    break
                }
                case 'DATA_SCIENCE':{
                    labels.push('Data Science')
                    break
                }
                case 'ANDROID_DEVELOPMENT':{
                    labels.push('Android')
                    break
                }
                case 'IOS_DEVELOPMENT':{
                    labels.push('IOS')
                    break
                }
                case 'QUALITY_ASSISTANCE':{
                    labels.push('QA')
                    break
                }
                case 'DESIGN':{
                    labels.push('UX/UI')
                    break
                }

            }

        })
    }else return ['']
    return labels
}