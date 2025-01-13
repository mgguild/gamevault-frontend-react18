/* eslint-disable no-param-reassign */

import BigNumber from 'bignumber.js'
import { GUILDPAD_STATUS } from '../../config/constants/types'
import { Guildpad } from '../types'

const mergingGuildpads = (guildpads: Guildpad[]): Guildpad[] => {
  const mergesGP = []

  guildpads.forEach((guildpad, index) => {
    let merging: Guildpad = {
      id: guildpads.length + 1,
      isStatic: true,
      title: guildpad.title,
      description: guildpad.description,
      round: `MERGED ${guildpad.title}`,
      status: GUILDPAD_STATUS.completed,
    }
    // Find nextRoundID property exists and check if not merged, has ended, and completed
    if (
      !guildpad.merged &&
      guildpad.nextRoundID &&
      guildpad.hasEnded &&
      guildpad.status === GUILDPAD_STATUS.completed
    ) {
      // copy all first round values
      merging = { ...guildpads[index], ...merging }
      // Get next round GP
      const toMergeGP = guildpads.filter((gp) => gp.id === guildpad.nextRoundID)[0]

      // Checks if toMergeGP exists, is round 2, has ended, and completed
      if (
        toMergeGP &&
        toMergeGP.round === '2' &&
        toMergeGP.hasEnded &&
        toMergeGP.status === GUILDPAD_STATUS.completed
      ) {
        guildpads[index].nextRoundID = 0
        Object.keys(guildpads[index]).forEach((key) => {
          if (key === 'totalSold' || key === 'totalRaise' || key === 'totalParticipants') {
            // Sum of totalSold and totalsRaise of from rounds
            merging[key] = new BigNumber(guildpads[index][key]).plus(new BigNumber(toMergeGP[key])).toString()
          }
          if (key === 'epochEndDate') {
            // get latest round epochEndDate
            merging[key] = toMergeGP[key]
          }
          if (key === 'percentage' || key === 'remainingSupply') {
            merging[key] = toMergeGP[key]
          }
          if (key === 'date') {
            merging[key] = { ...merging[key], end: toMergeGP[key].end }
          }
        })
        merging.id = guildpads.length + 1
        merging.display = true

        // remove mergable conditions after merge
        merging.nextRoundID = 0
        guildpads[index].merged = true
        toMergeGP.merged = true

        mergesGP.push(merging)
      }
    }
  })
  return mergesGP // guildpad merges
}

export default mergingGuildpads
