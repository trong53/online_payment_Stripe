<?php

function nameValidation(string $name) : bool
{
    return preg_match(
        '/^[A-zÀ-ÿ]{1,}\s?([A-zÀ-ÿ]{1,}\'?\-?[A-zÀ-ÿ]{1,}\s?)+([A-zÀ-ÿ]{1,})?$/',
        $name
    ) === 1;
}

function emailValidation(string $email) : bool
{
    return preg_match(
        '/^[A-z][A-z0-9_\.\-]{2,32}@([A-z0-9\.\-]{3,15})(\.[A-z]{2,8}){1,2}$/',
        $email
    ) === 1;
}


?>