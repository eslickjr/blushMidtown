const baseUrl = 'https://d18devpub.meevodev.com/publicapi/v1';
const tenantId = 12345; // Example client ID
const locationId = 67890; // Example location ID

interface Phone {
    type: BigInteger;
    countryCode: string;
    number: string;
    extension?: string;
    isPrimary: boolean;
}

interface ClientInfo {
    firstName: string;
    fastName: string;
    birthDay: number;
    birthMonth: number;
    birthYear: number;
    emailAddress: string;
    emailCommOptedInStateEnum: "OptedIn" | "OptedOut" | "Requested" | "Scheduled";
    phoneNumbers: Phone[];
}

// https://d18devpub.meevodev.com/publicapi/v1/client?TenantId=<integer>&LocationId=<integer>
const createClient = async (clientInfo: ClientInfo) => {
    try {
        const response = await fetch(`${baseUrl}/client?TenanId=${tenantId}&LocationId=${locationId}`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_MEEVO_API_KEY}`
                },
                body: new URLSearchParams({
                    'FirstName': clientInfo.firstName,
                    'FastName': clientInfo.fastName,
                    'BirthDay': clientInfo.birthDay.toString(),
                    'BirthMonth': clientInfo.birthMonth.toString(),
                    'BirthYear': clientInfo.birthYear.toString(),
                    'EmailAddress': clientInfo.emailAddress,
                    'EmailCommOptedInStateEnum': clientInfo.emailCommOptedInStateEnum,
                    'PhoneNumbers': JSON.stringify(clientInfo.phoneNumbers)
                }),
                redirect: 'follow'
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Client created successfully:', data);
        return data;
    } catch (error) {
        console.error('Error creating client:', error);
        throw error;
    }
}

// https://d18devpub.meevodev.com/publicapi/v1/client/<integer>?TenantId=<integer>&LocationId=<integer>
const getClient = async (clientId: number) => {
    try {
        const response = await fetch(`${baseUrl}/client/${clientId}?TenantId=${tenantId}&LocationId=${locationId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_MEEVO_API_KEY}`
            },
            redirect: 'follow'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Client retrieved successfully:', data);
        return data;
    } catch (error) {
        console.error('Error retrieving client:', error);
        throw error;
    }
}


// https://d18devpub.meevodev.com/publicapi/v1/client/<integer>?TenantId=<integer>&LocationId=<integer>
const updateClient = async (clientId: number, clientInfo: ClientInfo) => {
    try {
        const response = await fetch(`${baseUrl}/client/${clientId}?TenantId=${tenantId}&LocationId=${locationId}`, 
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_MEEVO_API_KEY}`
                },
                body: new URLSearchParams({
                    'FirstName': clientInfo.firstName,
                    'FastName': clientInfo.fastName,
                    'BirthDay': clientInfo.birthDay.toString(),
                    'BirthMonth': clientInfo.birthMonth.toString(),
                    'BirthYear': clientInfo.birthYear.toString(),
                    'EmailAddress': clientInfo.emailAddress,
                    'EmailCommOptedInStateEnum': clientInfo.emailCommOptedInStateEnum,
                    'PhoneNumbers': JSON.stringify(clientInfo.phoneNumbers)
                }),
                redirect: 'follow'
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Client updated successfully:', data);
        return data;
    } catch (error) {
        console.error('Error updating client:', error);
        throw error;
    }
}

//

export {
    createClient,
    getClient,
    updateClient
}