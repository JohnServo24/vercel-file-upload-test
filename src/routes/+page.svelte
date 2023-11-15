<script>
    import { enhance } from "$app/forms";

    export let form;
    let message = "";

    const onEnhance = () => {
        return ({ result }) => {
            if (result?.type === "success") {
                message = "Success";
            } else {
                message = "Not success";
            }
        };
    };

    const onChange = async (e) => {
        e.preventDefault();

        const target = e.target;
        const file = target.files[0];

        const formData = new FormData();
        formData.append("fileInput", file);

        const resRaw = await fetch("/api/fileUpload", {
            method: "POST",
            body: formData,
        });

        if (!resRaw.ok || resRaw.status === 413) {
            message = "Not success";
            return;
        }

        message = "Success";
    };
</script>

<p>
    FILE UPLOAD TEST BY JC SERVO (DONT MIND THE DESIGN THIS IS JUST FOR TESTING
    PURPOSES)
</p>

{#if message !== ""}
    <p>Message: {message}</p>
{/if}

<p>API:</p>
<input on:change={onChange} type="file" />

<p>Form Actions:</p>
<form method="POST" enctype="multipart/form-data" use:enhance={onEnhance}>
    <input name="fileUpload" type="file" />
    <button type="submit">SUBMIT</button>
</form>
