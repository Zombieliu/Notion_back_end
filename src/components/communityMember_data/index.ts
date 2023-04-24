const CommunityMemberData  = async (response: any) =>{
    let CommunityMemberDataList = []
    for (let i = 0 ;i<response.length;i++){
        const List = {
            name:response[i].properties.Name.title[0].plain_text,
            img:response[i].properties.Img.files[0].file.url,
            position:response[i].properties.Position.rich_text[0].plain_text,
            text:response[i].properties.Text.rich_text[0].plain_text,
        }
        CommunityMemberDataList.push(List)
    }
    return CommunityMemberDataList
}

export {CommunityMemberData}
