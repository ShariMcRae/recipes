// Provides CRUD methods for accessing the
// data located at MockApi.com.

export async function getRecords(searchBy, query, endpoint, sortBy, sortOrder) {
  try {
    console.log("getRecords", JSON.stringify({searchBy, query, endpoint, sortBy, sortOrder}));
    const url = new URL(endpoint);
    if (query)
      url.searchParams.append(searchBy, query);
    if (sortBy)
      url.searchParams.append('sortBy', sortBy);
    if (sortOrder)
      url.searchParams.append('order', sortOrder);

    const resp = await fetch(url);
    if (resp.statusText !== "OK") {
      console.log("Throwing error in getRecords, resp", resp);
      if (resp.status === 429)
        throw new Error("Too many requests....please slow down.");
      else
        throw new Error (resp.statusText); 
    }

    const records = await resp.json();
    if (records === 'Not found') return [];
    else return records;

  } catch (e) {
    console.log("Arguments: " + JSON.stringify({searchBy, query, endpoint, sortBy, sortOrder}));
    console.log(e);
    throw new Error(e);
  }
}

export async function createRecord(endpoint, newRecord) {
  try { 
    console.log("createRecord, newRecord", JSON.stringify(newRecord));    
    const resp = await fetch(`${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecord),
    });
    return await resp.json();
    
  } catch (e) {
    console.log("newRecord", newRecord);
    console.log(e);
    throw new Error(e);
  }
}

export async function getRecord(endpoint, id) {
  try {
    console.log("getRecord, id", id);    
    const url = new URL(endpoint);
    url.searchParams.append("id", id ? id : "0");
    const resp = await fetch(url);

    if (resp.statusText !== "OK") {
      console.log("Throwing error in getRecord, resp", resp);
      if (resp.status === 429)
        throw new Error("Too many requests....please slow down.");
      else
        throw new Error (resp.statusText); 
    }  

    const data = await resp.json();
    return data ? data[0] ?? null : {};

  } catch (e) {
    console.log(e);
    console.log("id", id);
    throw new Error(e);
  }
}

export async function updateRecord(endpoint, id, updatedRecord) {
  try {
    console.log("updateRecord, updatedRecord", JSON.stringify(updatedRecord));    
    const resp = await fetch(`${endpoint}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRecord),
    });

    if (resp.statusText !== "OK") {
      console.log("Throwing error in updateRecord, resp", resp);
      if (resp.status === 429)
        throw new Error("Too many requests....please slow down.");
      else
        throw new Error (resp.statusText); 
    }

    return await resp.json();

  } catch (e) {
    console.log(e);
    console.log("updatedRecord", updatedRecord);
    throw new Error(e);
  }
}

export async function deleteRecord(endpoint, id) {
  try {
    console.log("deleteRecord, id", id);    
    const resp = await fetch(`${endpoint}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await resp.json();

  } catch (e) {
    console.log(e);
    console.log("id", id);
    throw new Error(e);
  }
}
