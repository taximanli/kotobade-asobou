import { useState, useEffect } from 'react'

import { WORDS } from '../../constants/wordlist'
import { t } from '../../constants/strings'

export const Search = () => {
  const [query, setQuery] = useState<string>('')
  const [results, setResults] = useState<string[]>([])

  useEffect(() => {
    console.log(query)
    try {
      const re = new RegExp(query)
      const tempResults: string[] = []
      WORDS.forEach((word) => {
        if (re.test(word)) {
          tempResults.push(word)
        }
      })
      setResults(tempResults)
    } catch (error) {
      return
    }
  }, [query])

  return (
    <div className="flex justify-center flex-column search">
      <div className="max-w-lg mx-auto text-center">
        <div className="local-font mb-1 text-xs sm:text-sm md:text-base lg:text-lg font-bold shrink dark:text-white">
          {t('RegExp Search')}
        </div>
        <input
          className="h-7 mb-1 xs:h-8 sm:h-10 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600 border-solid border-2 mx-0.5 pl-2 text-lg sm:text-xl local-font rounded dark:text-white"
          onChange={(event) => setQuery(event.target.value)}
        ></input>
        {query.length !== 0 && (
          <div
            className="overflow-y-scroll border-solid border-2 border-slate-200 rounded"
            style={{
              height: 'max-content',
              maxHeight: '16rem',
              // overflowY: 'scroll',
            }}
          >
            {results.map((value, index) => (
              <div className="mb-1" key={index}>
                {value}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
