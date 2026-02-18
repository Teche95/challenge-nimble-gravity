
export interface UserData {
    uuid: string | undefined
    candidateId: string 
    applicationId?: string
    firstName: string
    lastName: string
    email: string
}

export interface PositionsData {
    id: string,
    title: string
}

export interface ApplyResponse {
  ok: boolean
}

export interface ApplyBody {
  uuid: string
  jobId: string
  applicationId: string
  candidateId:string
  repoUrl: string
}