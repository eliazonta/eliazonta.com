import { ContentPage } from '../../components/ContentPage'
import { essays } from '../../data/essays'

export default function Essays() {
    return (
        <ContentPage
            title={<>FAVORITE<br />ESSAYS</>}
            items={essays}
            searchPlaceholder="Search essays..."
            baseUrl="/essays"
        />
    )
}