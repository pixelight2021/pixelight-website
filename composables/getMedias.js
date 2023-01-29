export default async function () {
    try {
        const url = 'http://localhost/wordpress/wp-json/wp/v2/media?_fields=id,source_url'
        const res = await useFetch(url)

        //requested media not found
        if (res.error.value) throw res.error.value

        return res.data.value
    } catch (err) {
        console.error(err)
    }
}