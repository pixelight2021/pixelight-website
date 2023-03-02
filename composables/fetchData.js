const appConfig = useAppConfig()
const runtimeConfig = useRuntimeConfig()
const domain = runtimeConfig.public.domain

export default function fetchData() {
    return Promise.all([
        fetchAllTags(),
        fetchAllTagGroups(),
        fetchAllWorks(),
        fetchAllCategories(),
        fetchAllClients()
    ])
}

function fetchAllTags() {
    const url = domain + '/wordpress/wp-json/tag-groups/v1/terms?_fields=id,name,slug,groups'
    return useFetch(url).then(({ data }) => appConfig.tags = data.value).catch(({ error }) => console.error(error))
}
function fetchAllTagGroups() {
    const url = domain + '/wordpress/wp-json/tag-groups/v1/groups?_fields=term_group,label,terms'
    return useFetch(url).then(({ data }) => appConfig.tagGroups = data.value).catch(({ error }) => console.error(error))
}
function fetchAllCategories() {
    const url = domain + '/wordpress/wp-json/wp/v2/categories?_fields=id,count,name,slug&per_page=100'
    return useFetch(url).then(({ data }) => appConfig.categories = data.value.filter(c => c.slug != 'uncategorized')).catch(({ error }) => console.error(error))
}
function fetchAllWorks() {
    const url = domain + '/wordpress/wp-json/wp/v2/works?_fields=id,categories,tags,acf&per_page=100'
    return useFetch(url).then(({ data }) => appConfig.works = data.value).catch(({ error }) => console.error(error))
}
function fetchAllClients() {
    const url = domain + '/wordpress/wp-json/wp/v2/clients?_fields=id,acf&per_page=100'
    return useFetch(url).then(({ data }) => appConfig.clients = data.value).catch(({ error }) => console.error(error))
}

export function fetchWorks(condition) {
    const url = domain + '/wordpress/wp-json/wp/v2/works' + condition
    return useFetch(url)
}

export function fetchMedia(mediaId) {
    const url = domain + '/wordpress/wp-json/wp/v2/media/' + mediaId + '?_fields=source_url'
    return useFetch(url)
}