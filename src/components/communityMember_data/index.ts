const CommunityMemberData = async (response: any[]): Promise<CommunityMember[]> => {
  return response.map(item => ({
    name: item.properties.Name.title[0].plain_text,
    img: item.properties.Img.files[0].file.url,
    position: item.properties.Position.rich_text[0].plain_text,
    text: item.properties.Text.rich_text[0].plain_text,
  }));
};

interface CommunityMember {
  name: string;
  img: string;
  position: string;
  text: string;
}

export { CommunityMemberData };
