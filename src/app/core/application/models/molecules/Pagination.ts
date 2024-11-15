import { Metadata } from "@/app/core/application/dto";

export interface IPaginationProps {
    onNext: () => void;
    onPrevious: () => void;
    pagination: Metadata;
}