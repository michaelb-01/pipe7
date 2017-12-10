export interface IEntity {
  _id?: Mongo.ObjectID;
  job: {
    jobId: string,
    jobName: string
  };
  name: string;
  type: string;
  tasks: any[];
  status: string;
  thumbUrl?: string;
  description?: string;
  todos?: any[];  
  path?: string;
  public: boolean;
}

export class Entity implements IEntity {
  _id?: Mongo.ObjectID;
  job: {
    jobId: '',
    jobName: ''
  };
  name: string = '';
  type: string = '';
  tasks: any[] = [];
  status: string = '';
  thumbUrl?: string = '';
  description?: string = '';
  todos?: any[] = [];  
  path?: string = '';
  public: boolean = true;
}