import { Paper, Typography } from "@mui/material";

interface DashboardPaperProps {
    title?: string
    subTitle?: string
    children: React.ReactNode | React.ReactNode[]  // accept any react node as children

}

export default function DashboardPaper({ title, subTitle, children }: DashboardPaperProps) {
    return (
        <>
            <Paper variant="outlined" sx={{
                p: 3,
                borderRadius: "10px",
                height: "fit-content",
                width: "100%"
            }}>
                {title ? <Typography variant="h6">{title}</Typography> : null}
                {subTitle ? <Typography variant="subtitle1" fontSize="small">{subTitle}</Typography> : null}
                {children}
            </Paper>
        </>
    );
}