'use client'

import dynamic from 'next/dynamic'

const MFAProvider = dynamic(() => import('./MFAProvider'), {
  ssr: false,
  loading: () => <div>Loading MFA System...</div>
})

export default MFAProvider