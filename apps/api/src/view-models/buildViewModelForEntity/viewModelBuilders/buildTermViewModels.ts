import { Term } from 'apps/api/src/domain/models/term/entities/term.entity'
import { entityTypes } from 'apps/api/src/domain/types/entityType'
import { isInternalError } from 'apps/api/src/lib/errors/InternalError'
import { ViewModelBuilderDependencies } from '../buildViewModelForEntity'
import { TermViewModel } from '../viewModels'

export default async ({
    repositoryProvider,
    configService,
}: ViewModelBuilderDependencies): Promise<TermViewModel[]> => {
    const termRepository = repositoryProvider.forEntity<Term>(entityTypes.term)

    const searchResult = await termRepository.fetchMany()

    const allTermViewModels = searchResult
        // We are swallowing the error. It would be good to at least log the invalid state.
        .filter((result): result is Term => !isInternalError(result))
        // TODO Make this happen in one place (not in every view model builder)
        .filter(({ published }) => published)
        .map((term) => new TermViewModel(term, configService.get<string>('BASE_AUDIO_URL')))

    return allTermViewModels
}
