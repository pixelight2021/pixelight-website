export default async function () {
    try {
        const url = 'http://192.168.2.140/wordpress/wp-json/wp/v2/media?_fields=id,source_url'
        const res = await useFetch(url)

        //requested media not found
        if (res.error.value) throw res.error.value

        return res.data.value
    } catch (err) {
        console.error(err)
    }
}