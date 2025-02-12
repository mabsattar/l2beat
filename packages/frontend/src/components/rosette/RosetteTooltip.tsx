import React from 'react'

import { cn } from '../../utils/cn'
import {
  sentimentToFillColor,
  sentimentToTextColor,
} from '../../utils/risks/color'
import { RiskSentiments, RiskValue, RiskValues } from '../../utils/risks/types'
import { UnderReviewBadge } from '../badge/UnderReviewBadge'
import { RoundedWarningIcon } from '../icons'
import { MediumRosette } from './Rosette'

export interface RosetteTooltipProps {
  riskSentiments: RiskSentiments
  riskValues: RiskValues
}

export function RosetteTooltipPopup({
  riskValues,
  riskSentiments,
}: RosetteTooltipProps) {
  const isUnderReview = Object.values(riskSentiments).every(
    (sentiment) => sentiment === 'UnderReview',
  )

  if (isUnderReview) {
    return (
      <div className="w-[300px]">
        <div className="mb-4">
          <span className="text-base font-bold">Risk analysis</span> is{' '}
          <UnderReviewBadge />
        </div>

        <p>
          Projects under review might present uncompleted information & data.
          <br />
          L2BEAT Team is working to research & validate content before
          publishing.
        </p>
      </div>
    )
  }

  return (
    <div className="flex w-[370px] flex-col">
      <span className="text-base font-bold">
        <span className="mr-2">Risk analysis</span>
      </span>
      <div className="flex items-center gap-6">
        <div className="">
          <MediumRosette risks={riskSentiments} />
        </div>
        <div className="flex flex-col gap-4">
          <RiskValueComponent
            title="Sequencer failure"
            risk={riskValues.sequencerFailure}
          />
          <RiskValueComponent
            title="State validation"
            risk={riskValues.stateValidation}
          />
          <RiskValueComponent
            title="Data availability"
            risk={riskValues.dataAvailability}
          />
          <RiskValueComponent
            title="Exit window"
            risk={riskValues.exitWindow}
          />
          <RiskValueComponent
            title="Proposer failure"
            risk={riskValues.proposerFailure}
          />
        </div>
      </div>
    </div>
  )
}

interface RiskValueProps {
  title: string
  risk: RiskValue
}

function RiskValueComponent({ title, risk }: RiskValueProps) {
  return (
    <div className="font-medium">
      <span className="mb-1 block text-[10px] uppercase">{title}</span>
      {risk.sentiment === 'UnderReview' ? (
        <UnderReviewBadge />
      ) : (
        <span
          className={cn(
            sentimentToTextColor(risk.sentiment),
            'flex items-center gap-1 text-base',
          )}
        >
          {risk.value}
          {risk.warning?.sentiment && (
            <RoundedWarningIcon
              className={cn(
                'h-5 w-5',
                sentimentToFillColor(risk.warning.sentiment),
              )}
            />
          )}
        </span>
      )}
    </div>
  )
}
