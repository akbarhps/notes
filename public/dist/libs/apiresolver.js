async function get(host) {
    const res = await fetch(host);
    const json = await res.json();
    return await json;
}