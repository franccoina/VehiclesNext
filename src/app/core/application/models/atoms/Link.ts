export interface ILinkProps {
    key?: string;
    href: string;
    label: string;
    target?: '_blank' | '_self';
    onClick?: (e: React.MouseEvent) => void;
    icon?: React.ReactNode;
    className?: string;
}