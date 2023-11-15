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

<p class="header">
    FILE UPLOAD TEST BY JC SERVO
    <i> (DONT MIND THE DESIGN THIS IS JUST FOR TESTING PURPOSES) </i>
</p>
<div class="input">
    <strong>
        Vercel has a limit of 4.5mb for uploading files (this applies to all
        plans). Try uploading a file that's at least 5mb. It's going to cause an
        error.
    </strong>
</div>

{#if message !== ""}
    <p class="{message === 'Success' ? 'success' : 'error'} input text-color">
        Message: {message}
    </p>
{/if}

<ul>
    <li>
        <p>API <i>(Use this to test a POST request on an API)</i>:</p>
        <input on:change={onChange} class="input" type="file" />
    </li>
    <li>
        <p>
            Form Actions <i>(Use this to test a Form Action on Sveltekit)</i>:
        </p>
        <form
            method="POST"
            enctype="multipart/form-data"
            use:enhance={onEnhance}
        >
            <input name="fileUpload" type="file" />
            <button type="submit">SUBMIT</button>
        </form>
    </li>
</ul>

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
