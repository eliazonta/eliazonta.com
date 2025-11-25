import { ContentPage } from '../../components/ContentPage'
import { quotes } from '../../data/quotes'

export default function Quotes() {
    return (
        <ContentPage
            title="FAVORITE QUOTES"
            items={quotes}
            searchPlaceholder="Search quotes..."
            baseUrl="/quotes"
            shuffle={false}
        />
    )
}