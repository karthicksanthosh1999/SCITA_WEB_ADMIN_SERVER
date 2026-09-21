interface JobTopic {
  id?: string;
  title: string;
  description: string;
  order: number;
}

export class JobEntity {
  public id?: string;
  public title: string;
  public overview: string;
  public email: string | null;
  public mobileNo: string | null;
  public topics: JobTopic[];

  constructor(data: {
    id?: string;
    title: string;
    overview: string;
    email: string | null;
    mobileNo: string | null;
    topics?: JobTopic[];
  }) {
    this.id = data.id;
    this.title = data.title;
    this.overview = data.overview;
    this.email = data.email;
    this.mobileNo = data.mobileNo;
    this.topics = data.topics ?? [];
  }
}