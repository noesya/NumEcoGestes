import badge1Unchecked from '@/assets/images/badges/badge1_unchecked.svg'
import badge1Checked from '@/assets/images/badges/badge1_checked.svg'
import badge2Unchecked from '@/assets/images/badges/badge2_unchecked.svg'
import badge2Checked from '@/assets/images/badges/badge2_checked.svg'
import badge3Unchecked from '@/assets/images/badges/badge3_unchecked.svg'
import badge3Checked from '@/assets/images/badges/badge3_checked.svg'
import badge4Unchecked from '@/assets/images/badges/badge4_unchecked.svg'
import badge4Checked from '@/assets/images/badges/badge4_checked.svg'
import badge5Unchecked from '@/assets/images/badges/badge5_unchecked.svg'
import badge5Checked from '@/assets/images/badges/badge5_checked.svg'

export default [
    {
        label: "Novice",
        points: 200,
        icon: {
            unchecked: badge1Unchecked,
            checked: badge1Checked
        }
    },
    {
        label: "Initié·e",
        points: 400,
        icon: {
            unchecked: badge2Unchecked,
            checked: badge2Checked
        }
    },
    {
        label: "Confirmé·e",
        points: 600,
        icon: {
            unchecked: badge3Unchecked,
            checked: badge3Checked
        }
    },
    {
        label: "Expert·e",
        points: 800,
        icon: {
            unchecked: badge4Unchecked,
            checked: badge4Checked
        }
    },
    {
        label: "Maître",
        points: 950,
        icon: {
            unchecked: badge5Unchecked,
            checked: badge5Checked
        }
    },
]
