import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import {
	Box,
	TextField,
	Typography,
	TextareaAutosize,
	Button,
} from "@mui/material";
import axios from "axios";
import { log } from "console";
declare let window: any;

export default function PostWrite() {
	const params = useParams();
	const nav = useNavigate();
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");

	function handleTitle(event: any) {
		setTitle(event.target.value);
	}
	function handleBody(event: any) {
		setBody(event.target.value);
	}

	const handlePost = async () => {
		await axios
			.post(
				`http://localhost:4000/post/${params.boardid}/create`,
				{
					title,
					body,
				},
				{
					withCredentials: true,
				}
			)
			.then((res) => {
				if (res.data.message === "성공, 토큰 지급") {
					window.alert("15토큰이 지급되었습니다.");
				} else if (res.data.message === "성공, 토큰 미지급") {
					window.alert("이미 토큰을 받았습니다.");
				}
			});

		nav(`/community/${params.boardid}`);
	};

	return (
		<>
			<Box p={5} mt={5} textAlign="center">
				<Typography variant="h6">글 작성</Typography>
				<TextField
					autoFocus
					id="title"
					name="title"
					label="제목"
					type="title"
					fullWidth
					variant="standard"
					placeholder="글 제목을 작성해주세요"
					InputProps={{ style: { fontSize: 25, paddingLeft: 10 } }}
					InputLabelProps={{ style: { fontSize: 25, paddingLeft: 10 } }}
					sx={{ m: "40px auto" }}
					onChange={handleTitle}
				/>
				<TextareaAutosize
					minRows={20}
					style={{ width: "100%", fontSize: "20px", padding: 20 }}
					onChange={handleBody}
				/>
			</Box>
			<Box textAlign="right" mr={5}>
				<Link
					to={`/community/${params.boardid}`}
					style={{ textDecoration: "none" }}
				>
					<Button size="large">취소</Button>
				</Link>
				<Button size="large" onClick={handlePost}>
					발행
				</Button>
			</Box>
		</>
	);
}
