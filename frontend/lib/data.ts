import axios from "axios";

export async function getAllJobs() {
    const options = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/jobs`,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    let resp = await axios
        .request(options)

    return resp.data

}

export async function getJobsByFilter(query: string) {
    const options = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/jobs?${query}`,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    let resp = await axios
        .request(options)

    return resp.data

}

export async function getJobsById(id: string) {
    console.log("++++++++++++++++")
    console.log(id)
    console.log("++++++++++++++++")
    const options = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    let resp = await axios
        .request(options)

    return resp.data

}

export async function getSavedJobs(token: string | undefined) {
    const options = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/users/saved-jobs`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    let resp = await axios
        .request(options)

    return resp.data

}

export async function getUserRequest(token: string | undefined) {
    const options = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/users`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    let resp = await axios
        .request(options)

    return resp.data

}


export async function verifyUserReq(token: string | undefined) {
    const options = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/verify?token=${token}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    let resp = await axios
        .request(options)

    return resp.data

}

export async function getWorkType() {
    const options = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/work-types`,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    let resp = await axios
        .request(options)

    return resp.data

}


export async function getTags() {
    const options = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/tags`,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    let resp = await axios
        .request(options)

    return resp.data

}

export async function getLocations() {
    const options = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/location`,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    let resp = await axios
        .request(options)

    return resp.data

}


export async function updateUserReq(data, token: string | undefined) {
    const options = {
        method: 'put',
        url: `${process.env.NEXT_PUBLIC_API_URL}/users`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data
    };

    let resp = await axios
        .request(options)

    return resp.data

}


export async function savedJob(id: string, token: string | undefined) {
    const options = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/users/saved-jobs/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    let resp = await axios
        .request(options)

    return resp.data

}

export async function unsaveJob(id: string, token: string | undefined) {
    const options = {
        method: 'delete',
        url: `${process.env.NEXT_PUBLIC_API_URL}/users/saved-jobs/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    let resp = await axios
        .request(options)

    return resp.data

}

export async function registerUserReq(data) {
    const options = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        headers: {
            'Content-Type': 'application/json'
        },
        data
    };

    let resp = await axios
        .request(options)

    return resp.data
}


export async function createJobApplication(data) {
    const options = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/jobapplication`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    let resp = await axios
        .request(options)

    return resp.data
}


export async function uploadCV(file, token: string | undefined) {
    const formData = new FormData();
    formData.append('file', file);

    const options = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/users/cv`,
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        },
        data: formData
    };

    let resp = await axios
        .request(options)

    return resp.data
}

export async function downloadCV(token: string | undefined) {
    const options = {
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_API_URL}/cv/download`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };

    let resp = await axios
        .request(options)

    return resp.data
}
