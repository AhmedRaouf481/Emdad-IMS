"use client"

import { Box, Button } from "@mui/material";
import TableView from "./_components/TableView";
import { header } from "./_components/data";
import api from "@/core/api/api";
import { useEffect, useState } from "react";

export default function Product() {
    const [data, setData] = useState([])
    const [flag, setFlag] = useState(false)
    useEffect(() => {
        api.get('/product').then((res) => {
            setData(res.data.data)
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }, [flag])
    console.log(data);

    return (
        <><Box mt={1} mr={4}>
            <Button onClick={() => { setFlag(!flag) }}>
                search
            </Button>
            <TableView
                data={data}
                renderItem={header}
                rowHeight="20px"
                stickyHeader={true}
                // sx={{ mb: 5 }}
                onRowClick={(item) => console.log(item)}
            />
        </Box>
        </>
    );
}
