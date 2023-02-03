export default async function () {
    try {
        const url = 'http://192.168.2.140/wordpress/wp-json/tag-groups/v1/terms?_fields=id,name,slug,groups'
        const res = await useFetch(url)

        //requested media not found
        if (res.error.value) throw res.error.value

        return res.data.value
    } catch (err) {
        console.error(err)
    }
}