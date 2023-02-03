export default async function () {
    try {
        const url = 'http://192.168.2.140/wordpress/wp-json/tag-groups/v1/groups?_fields=term_group,label,terms'
        const res = await useFetch(url)
        if (res.error.value) throw res.error.value

        return res.data.value
    } catch (err) {
        console.error(err)
    }
}