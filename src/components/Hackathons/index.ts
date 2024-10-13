const HackathonsData = async (response: any[]): Promise<HackathonItem[]> => {
  return response.map(item => ({
    id: item.properties.ID.number,
    name: item.properties.Name.title[0].plain_text,
    img: item.properties.Img.files[0].file.url,
    state: item.properties.State.status.name,
    time: item.properties.Time.rich_text[0].plain_text,
    registrationLink: item.properties.RegistrationLink.url || "",
    activityLink: item.properties.ActivityLink.url,
    text: item.properties.Text.rich_text[0].plain_text,
  }));
};

interface HackathonItem {
  id: number;
  name: string;
  img: string;
  state: string;
  time: string;
  registrationLink: string;
  activityLink: string;
  text: string;
}

export { HackathonsData };
