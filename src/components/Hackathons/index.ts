const HackathonsData  = async (response: any) =>{

    let HackathonsDataList = []
    for (let i = 0 ;i<response.length;i++){
        const List = {
            id:response[i].properties.ID.number,
            name:response[i].properties.Name.title[0].plain_text,
            img:response[i].properties.Img.files[0].file.url,
            state:response[i].properties.State.status.name,
            time:response[i].properties.Time.rich_text[0].plain_text,
            registrationLink:response[i].properties.RegistrationLink.url?response[i].properties.RegistrationLink.url:"",
            activityLink:response[i].properties.ActivityLink.url,
            text:response[i].properties.Text.rich_text[0].plain_text,
        }
        HackathonsDataList.push(List)
    }

    return HackathonsDataList
}

export {HackathonsData}
