{
  pkgs,
  lib,
  config,
  inputs,
  ...
}: {
  languages.javascript = {
    enable = true;

    npm = {
      enable = true;
    };
  };
}
