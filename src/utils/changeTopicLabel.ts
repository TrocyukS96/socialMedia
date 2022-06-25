export const changeTopicLabel =(topicToChange:string)=>{
    let label='' as string;
   switch (topicToChange){
       case 'WEB_DEVELOPMENT': {
           label='Web'
           break
       }
       case 'DATA_SCIENCE': {
           label='Data Science'
           break
       }
       case 'ANDROID_DEVELOPMENT': {
           label='Android'
           break
       }
       case 'IOS_DEVELOPMENT': {
           label='IOS'
           break
       }
       case 'QUALITY_ASSISTANCE': {
           label='QA'
           break
       }
       case 'DESIGN': {
           label='UX/UI'
           break
       }
       default:{
           label=topicToChange
       }
   }

    return label
}