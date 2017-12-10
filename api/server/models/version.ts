export interface Version {
  job: {
    jobId: string,
    jobName: string
  };
  entity: {
    entityId: string,
    entityName: string
  };
  author: string;
  version: number;
  comments?: any[];
  review: any[];
  contentType: string;
  taskType: {
    type: string,
    idx: number
  };
  content?: string;
  thumbUrl?: string;
  description?: string;
  date?: Date;
  public: boolean;
}
