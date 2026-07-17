import { BinCondition, OperationalStatus } from '@prisma/client';
export function StatusBadge({children}:{children:React.ReactNode}){return <span className="badge bg-emerald-100 text-emerald-900">{children}</span>}
export function formatBinLabel(n:number){return `BIN ${String(n).padStart(4,'0')}`}
export function conditionTone(c: BinCondition){return c===BinCondition.GOOD?'bg-green-100':c===BinCondition.UNUSABLE||c===BinCondition.MISSING?'bg-red-100':'bg-amber-100'}
export function BinCard({bin}:{bin:{binNumber:number;name:string;condition:BinCondition;operationalStatus:OperationalStatus}}){return <article className="card p-3"><div className="font-bold">{formatBinLabel(bin.binNumber)}</div><div>{bin.name}</div><div className="mt-2 flex gap-2 flex-wrap"><span className={`badge ${conditionTone(bin.condition)}`}>{bin.condition.replaceAll('_',' ')}</span><StatusBadge>{bin.operationalStatus.replaceAll('_',' ')}</StatusBadge></div></article>}
