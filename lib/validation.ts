import { z } from 'zod';
export const signInSchema=z.object({email:z.string().email(),password:z.string().min(8)});
export const requestSchema=z.object({binId:z.string().min(1),destinationLocationId:z.string().optional(),destinationQuadrantId:z.string().optional(),destinationStorageAreaId:z.string().optional(),requestedDate:z.coerce.date().optional(),reason:z.string().max(1000).optional()});
export const issueSchema=z.object({binId:z.string(),type:z.string(),description:z.string().min(3).max(4000),severity:z.string(),usable:z.boolean().default(true)});
export const placementSchema=z.object({cellId:z.string().optional(),storageAreaId:z.string().optional()}).refine(v=>Number(Boolean(v.cellId))+Number(Boolean(v.storageAreaId))===1,'Choose exactly one destination.');
