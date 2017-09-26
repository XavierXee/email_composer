export class Email {

  constructor(
    public to: string,
    public subject: string,
    public message: string,
    public cc?: string,
    public bcc?: string,
    public files?: File[]
  ) {  }

}