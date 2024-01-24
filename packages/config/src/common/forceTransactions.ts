import { formatSeconds } from '@l2beat/shared-pure'

import { ScalingProjectRisk } from './ScalingProjectRisk'
import { ScalingProjectTechnologyChoice } from './ScalingProjectTechnologyChoice'

const EXIT_CENSORSHIP: ScalingProjectRisk = {
  category: 'Users can be censored if',
  text: 'the operator refuses to include their transactions. However, there exists a mechanism to independently exit the system.',
}

const WITHDRAW: ScalingProjectTechnologyChoice = {
  name: 'Users can independently exit the system',
  description:
    'Independent exit allows the users to escape censorship by withdrawing their funds. The system allows users to  withdraw their funds by submitting a transaction directly to the contract on-chain.',
  risks: [EXIT_CENSORSHIP],
  references: [],
}

function WITHDRAW_OR_HALT(delay?: number): ScalingProjectTechnologyChoice {
  return {
    name: 'Users can force exit the system',
    description: `Force exit allows the users to escape censorship by withdrawing their funds. The system allows users to force the withdrawal of funds by submitting a request directly to the contract on-chain.  The request must be served within ${
      delay !== undefined ? formatSeconds(delay) : 'a defined time period'
    }. If this does not happen, the system will halt regular operation and permit trustless withdrawal of funds.`,
    risks: [EXIT_CENSORSHIP],
    references: [],
  }
}

function STARKEX_SPOT_WITHDRAW(delay?: number): ScalingProjectTechnologyChoice {
  return {
    ...WITHDRAW_OR_HALT(delay),
    references: [
      {
        text: 'Censorship Prevention - StarkEx documentation',
        href: 'https://docs.starkware.co/starkex/architecture/solution-architecture.html#8-censorship-prevention',
      },
    ],
  }
}

function STARKEX_PERPETUAL_WITHDRAW(
  delay?: number,
): ScalingProjectTechnologyChoice {
  return {
    ...WITHDRAW_OR_HALT(delay),
    description:
      WITHDRAW_OR_HALT(delay).description +
      ' Perpetual positions can also be force closed before withdrawing, however this requires the user to find the counterparty for the trade themselves.',
    references: [
      {
        text: 'Censorship Prevention - StarkEx documentation',
        href: 'https://docs.starkware.co/starkex/architecture/overview-architecture.html#8_censorship_prevention',
      },
      {
        text: 'Forced Trade - StarkEx documentation',
        href: 'https://docs.starkware.co/starkex/perpetual/forced-actions-escape-hatch-perpetual.html#forcedtrade',
      },
    ],
    risks: [
      EXIT_CENSORSHIP,
      {
        category: 'Funds can be lost if',
        text: 'the user is unable to find the counterparty for the force trade.',
      },
    ],
  }
}

const CANONICAL_ORDERING: ScalingProjectTechnologyChoice = {
  name: 'Users can force any transaction',
  description:
    'Because the state of the system is based on transactions submitted on-chain and anyone can submit their transactions there it allows the users to circumvent censorship by interacting with the smart contract directly.',
  risks: [],
  references: [],
}

const PROPOSE_OWN_BLOCKS: ScalingProjectTechnologyChoice = {
  name: 'Users can force any transaction',
  description:
    'Because the block production is open to anyone if users experience censorship from the operator they can propose their own blocks which would include their transactions.',
  risks: [
    {
      category: 'Users can be censored if',
      text: 'the operator refuses to include their transactions and users lack resources to propose blocks themselves.',
    },
  ],
  references: [],
}

const SEQUENCER_NO_MECHANISM: ScalingProjectTechnologyChoice = {
  name: "Users can't force any transaction",
  description:
    'There is no general mechanism to force the sequencer to include the transaction.',
  risks: [
    {
      category: 'Users can be censored if',
      text: 'the operator refuses to include their transactions.',
    },
  ],
  references: [],
}

const ENQUEUE: ScalingProjectTechnologyChoice = {
  name: 'Users can enqueue transactions',
  description:
    "Users can submit transactions to an L1 queue, but can't force them. The sequencer cannot selectively skip transactions but can stop processing the queue entirely. In other words, if the sequencer censors or is down, it is so for everyone.",
  risks: [
    {
      category: 'Users can be censored if',
      text: 'the operator is offline or refuses to process the queue.',
    },
  ],
  references: [],
}

export const FORCE_TRANSACTIONS = {
  WITHDRAW,
  WITHDRAW_OR_HALT,
  STARKEX_SPOT_WITHDRAW,
  STARKEX_PERPETUAL_WITHDRAW,
  CANONICAL_ORDERING,
  PROPOSE_OWN_BLOCKS,
  SEQUENCER_NO_MECHANISM,
  ENQUEUE,
}
