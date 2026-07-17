import { BinCondition, OperationalStatus, RequestStatus, TransferStatus, UserRole } from '@prisma/client';

export function formatBinLabel(binNumber: number) { return `BIN ${String(binNumber).padStart(4, '0')}`; }
export function parseBinSearch(input: string) { const m = input.trim().toUpperCase().match(/^(?:BIN\s*)?0*(\d+)$/); return m ? Number(m[1]) : null; }
export function canApprove(role: UserRole) { return role === UserRole.SUPERVISOR || role === UserRole.ADMIN; }
export function canAdmin(role: UserRole) { return role === UserRole.ADMIN; }
export function assertCanApprove(role: UserRole) { if (!canApprove(role)) throw new Error('Only supervisors and administrators can approve requests.'); }
export function nextBinNumber(existing: number[]) { return existing.length ? Math.max(...existing) + 1 : 1; }
export type PlacementInput = { cellId?: string | null; storageAreaId?: string | null };
export function validatePhysicalPlacement(input: PlacementInput) { const count = Number(Boolean(input.cellId)) + Number(Boolean(input.storageAreaId)); if (count !== 1) throw new Error('Choose exactly one cell or storage area.'); return true; }
export function activePlacementKey(binId: string, active: boolean) { return active ? binId : null; }
export function approveRequest(status: RequestStatus, role: UserRole) { assertCanApprove(role); if (status !== RequestStatus.REQUESTED) throw new Error('Only requested bins can be approved.'); return RequestStatus.APPROVED; }
export function declineRequest(status: RequestStatus, role: UserRole) { assertCanApprove(role); if (status !== RequestStatus.REQUESTED) throw new Error('Only requested bins can be declined.'); return RequestStatus.DECLINED; }
export function cancelRequest(status: RequestStatus, own: boolean, role: UserRole) { if (status === RequestStatus.IN_TRANSFER || status === RequestStatus.ARRIVED) throw new Error('Transfers already in motion cannot be cancelled.'); if (!own && !canApprove(role)) throw new Error('Only the requester, supervisors, or administrators can cancel.'); return RequestStatus.CANCELLED; }
export function startTransfer() { return { placementActive: false, binStatus: OperationalStatus.IN_TRANSFER, transferStatus: TransferStatus.IN_TRANSFER, requestStatus: RequestStatus.IN_TRANSFER }; }
export function confirmArrival(destination: PlacementInput) { validatePhysicalPlacement(destination); return { placementActive: true, binStatus: OperationalStatus.AVAILABLE, transferStatus: TransferStatus.ARRIVED, requestStatus: RequestStatus.ARRIVED }; }
export function retireBin() { return { condition: BinCondition.RETIRED, status: OperationalStatus.RETIRED, active: false }; }
