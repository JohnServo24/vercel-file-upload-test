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

<p class="header input">
    FILE UPLOAD TEST BY JC SERVO
    <i> (DONT MIND THE DESIGN THIS IS JUST FOR TESTING PURPOSES) </i>
</p>

{#if message !== ""}
    <p class="{message === 'Success' ? 'success' : 'error'} input text-color">
        Message: {message}
    </p>
{/if}

<p>API <i>(Use this to test a POST request on an API)</i>:</p>
<input on:change={onChange} class="input" type="file" />

<p>Form Actions <i>(Use this to test a Form Action on Sveltekit)</i>:</p>
<form method="POST" enctype="multipart/form-data" use:enhance={onEnhance}>
    <input name="fileUpload" type="file" />
    <button type="submit">SUBMIT</button>
</form>

<style>
    .success {
        background-color: green;
    }

    .error {
        background-color: red;
    }

    .header {
        border-bottom: 1px solid black;
    }

    .text-color {
        color: white;
        text-align: center;
        font-size: 36px;
    }

    .input {
        margin-bottom: 40px;
    }
</style>
