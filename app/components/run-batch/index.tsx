'use client'
import type { FC } from 'react'
import React from 'react'
import {
  PlayIcon,
} from '@heroicons/react/24/solid'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import CSVReader from './csv-reader'
import CSVDownload from './csv-download'
import Button from '@/app/components/base/button'
import Loading02 from '@/app/components/base/icons/line/loading-02'
export type IRunBatchProps = {
  vars: { name: string }[]
  onSend: (data: string[][]) => void
  isAllFinished: boolean
}

const RunBatch: FC<IRunBatchProps> = ({
  vars,
  onSend,
  isAllFinished,
}) => {
  const { t } = useTranslation()

  const [csvData, setCsvData] = React.useState<string[][]>([])
  const [isParsed, setIsParsed] = React.useState(false)
  const handleParsed = (data: string[][]) => {
    setCsvData(data)
    // console.log(data)
    setIsParsed(true)
  }

  const handleSend = () => {
    onSend(csvData)
  }
  const Icon = isAllFinished ? PlayIcon : Loading02
  return (
    <div className='pt-4'>
      <CSVReader onParsed={handleParsed} />
      <CSVDownload vars={vars} />
      <div className='mt-4 h-[1px] bg-gray-100'></div>
      <div className='flex justify-end'>
        <Button
          type="primary"
          className='mt-4 !h-8 !pl-3 !pr-4'
          onClick={handleSend}
          disabled={!isParsed || !isAllFinished}
        >
          <Icon className={cn(!isAllFinished && 'animate-spin', 'shrink-0 w-4 h-4 mr-1')} aria-hidden="true" />
          <span className='uppercase text-[13px]'>{t('app.generation.run')}</span>
        </Button>
      </div>
    </div>
  )
}
export default React.memo(RunBatch)
